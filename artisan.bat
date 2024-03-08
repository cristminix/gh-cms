@echo off
set "PATH=%CD%\node_modules\.bin;%PATH%"
set "NODE_NO_WARNINGS=1"

node %CD%\lib-artisan\artisan.mjs %*
