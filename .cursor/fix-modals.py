import json, subprocess, copy, random, string

path = "pencil/designs/2-review-and-revise/profile-settings.pen"
head = json.loads(subprocess.check_output(['git', 'show', 'HEAD:pencil/designs/2-review-and-revise/profile-settings.pen']))

with open(path) as f:
    data = json.load(f)

def gen_id():
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(6))

def find(node, sid):
    if isinstance(node, dict):
        if node.get('id') == sid:
            return node
        for c in node.get('children', []):
            r = find(c, sid)
            if r:
                return r
    elif isinstance(node, list):
        for i in node:
            r = find(i, sid)
            if r:
                return r

def remap_ids(node, id_map):
    if isinstance(node, dict):
        old = node.get('id')
        if old:
            if old not in id_map:
                id_map[old] = gen_id()
            node['id'] = id_map[old]
        if 'descendants' in node and isinstance(node['descendants'], dict):
            nd = {}
            for k, v in node['descendants'].items():
                parts = k.split('/')
                nd['/'.join(id_map.get(p, p) for p in parts)] = v
            node['descendants'] = nd
        for c in node.get('children', []):
            remap_ids(c, id_map)
    elif isinstance(node, list):
        for i in node:
            remap_ids(i, id_map)

def is_mobile(screen):
    return screen.get('width') == 390

def make_header(title):
    return {
        'type': 'frame', 'id': gen_id(), 'name': 'Header', 'width': 'fill_container',
        'justifyContent': 'space_between', 'alignItems': 'center',
        'children': [
            {'type': 'text', 'id': gen_id(), 'name': 'Title', 'fill': '$e:colors-text-header',
             'content': title, 'fontFamily': '$e:typo-primary-base-semibold-font-family',
             'fontSize': '$e:typo-primary-base-semibold-font-size', 'fontWeight': '600'},
            {'type': 'icon', 'id': gen_id(), 'name': 'Close', 'width': 18, 'height': 18,
             'icon': 'x', 'library': 'lucide', 'fill': '$e:colors-text-meta'},
        ],
    }

def make_dialog_shell(is_m):
    return {
        'type': 'frame', 'id': gen_id(), 'name': 'Dialog',
        'width': 342 if is_m else 320, 'fill': '$e:colors-background-surface',
        'cornerRadius': '$e:radius-sm', 'stroke': '$e:colors-borders-light',
        'strokeWidth': 1, 'strokeAlignment': 'inner',
        'effect': {'type': 'shadow', 'shadowType': 'outer', 'color': '#0000001A',
                   'offset': {'x': 0, 'y': 8}, 'blur': 24},
        'layout': 'vertical', 'gap': '$e:spacing-sm', 'padding': '$e:spacing-md', 'children': [],
    }

def extract_title(desc):
    return desc.get('y:YX4Qf', {}).get('content', 'Title')

def extract_body_children(desc):
    children = desc.get('y:MIGBE', {}).get('children')
    if not children:
        return []
    ch = copy.deepcopy(children)
    id_map = {}
    for c in ch:
        remap_ids(c, id_map)
    return ch

def extract_buttons(desc):
    actions = []
    primary = desc.get('y:mrNtf/y:sFmUs', {}).get('content')
    if desc.get('y:mrNtf', {}).get('enabled', True) and primary:
        actions.append({
            'id': gen_id(), 'type': 'ref', 'ref': 'k:I1kHx',
            'padding': ['$O:spacing-2xs', '$O:spacing-sm'],
            'descendants': {'k:b7tzPK': {'content': primary}},
        })
    return actions

git_d = find(head, 'f1eCnq')
git_m = find(head, 'hMe7U')

fixed = 0
for child in data.get('children', []):
    if child.get('type') != 'frame':
        continue
    for i, c in enumerate(child.get('children', [])):
        if c.get('name') != 'Modal' or c.get('ref') != 'y:i61SF':
            continue
        is_m = is_mobile(child)
        modal = copy.deepcopy(git_m if is_m else git_d)
        modal['id'] = c['id']
        modal['width'] = child['width']
        modal['height'] = child['height']
        modal['children'][0]['width'] = child['width']
        modal['children'][0]['height'] = child['height']
        id_map = {(git_m if is_m else git_d)['id']: c['id']}
        for ch in modal['children']:
            remap_ids(ch, id_map)
        dialog = modal['children'][1]
        dialog['x'] = 24 if is_m else 560
        dialog['y'] = 290.5 if is_m else 464
        desc = c.get('descendants', {})
        title = extract_title(desc)
        if title:
            dialog['children'][0]['children'][0]['content'] = title
        new_body = extract_body_children(desc)
        if new_body:
            header = dialog['children'][0]
            dialog['children'] = [header] + new_body
            buttons = extract_buttons(desc)
            if buttons:
                dialog['children'].append({
                    'type': 'frame', 'id': gen_id(), 'name': 'Actions',
                    'width': 'fill_container', 'gap': '$e:spacing-2xs',
                    'justifyContent': 'end', 'children': buttons,
                })
        child['children'][i] = modal
        fixed += 1

with open(path, 'w') as f:
    json.dump(data, f, indent=2)

print('Fixed', fixed)
