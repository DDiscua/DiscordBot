db = db.getSiblingDB('discord')


db.createUser({
    user: 'appUser',
    pwd: 'appPassword',
    roles: [
      {
        role: 'dbOwner',
      db: 'discord',
    },
  ],
});