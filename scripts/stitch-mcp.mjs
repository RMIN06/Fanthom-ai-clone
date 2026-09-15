import { StitchProxy } from '@google/stitch-sdk';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const apiKey = process.env.STITCH_API_KEY;

if (!apiKey) {
  console.error('STITCH_API_KEY is required to start the Stitch MCP server.');
  process.exit(1);
}

const proxy = new StitchProxy({
  apiKey,
  baseUrl: process.env.STITCH_HOST || 'https://stitch.googleapis.com/mcp',
});

await proxy.start(new StdioServerTransport());
