#!/bin/bash
for f in *.PNG; do 
mv -- "$f" "${f%.txt}.png"
done
