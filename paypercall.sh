#!/usr/bin/env bash
chargeUrl=$1
chargeToken=$2
paypercall --charge-url ${chargeUrl} \
--charge-token ${chargeToken} \
--upstream-url http://localhost:4444 --port 4443 --rates-yaml '{ POST /solve: 0.00000001 BTC }'
