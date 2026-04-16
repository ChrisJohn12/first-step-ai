#!/bin/bash

echo "Starting First Step AI..."

node server.js &
SERVER_PID=$!

npx vite &
VITE_PID=$!

echo "Server PID: $SERVER_PID"
echo "Vite PID:   $VITE_PID"
echo ""
echo "Press Ctrl+C to stop both servers."

trap "kill $SERVER_PID $VITE_PID 2>/dev/null; echo 'Servers stopped.'" EXIT

wait
