#!/bin/bash

mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    var rootUser = '$MONGODB_INIT_ROOT_USERNAME';
    var rootPassword = '$MONGODB_INIT_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);

    var user = '$MONGO_INITDB_USERNAME';
    var passwd = '$MONGO_INITDB_PASSWORD';
    db.createUser({user: user, pwd: passwd, roles: ["readWrite"]});
EOF