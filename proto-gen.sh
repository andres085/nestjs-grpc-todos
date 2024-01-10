#!/bin/bash
protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --proto_path=./proto --ts_proto_out=./proto --ts_proto_opt=nestJs=true ./proto/*.proto
