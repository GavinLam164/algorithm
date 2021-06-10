#/bin/bash

function origin_run {
	ssh -i ~/.ssh/id_shell root@39.108.85.106 "$1"
}

workspace='/root/projects/algorithm'

origin_run "cd ${workspace}; git pull"
origin_run "cd ${workspace}; yarn docs:build"