#!/usr/bin/env node

const $express = require('express');
const $process = require('process');

const $$app = $express();
const $$port = $process.env.PORT || 8080;
const $$mode = $process.env.MODE || 'development';
const $$root = __dirname;

require('./lib/express')({ $$app, $$root, $$mode });

$$app.listen( $$port, () => console.log(`server at ${$$port}!`) );