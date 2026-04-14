#!/usr/bin/env python3
"""
Vega — AI Design Agent
Entry point. Run from the design-specs directory:

    python -m vega.run --tokens-dir .

Or with environment variables:

    export ANTHROPIC_API_KEY=sk-ant-...
    export VEGA_TOKENS_DIR=./
    python -m vega.run
"""

import sys
import os

# Add parent directory to path so we can import vega
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from vega.cli import run_cli

if __name__ == "__main__":
    run_cli()
