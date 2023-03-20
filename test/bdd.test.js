const { test } = require('@jest/globals');
const { newDb } = require('pg-mem');



test('test requête', () => {
    const db = newDb();
    db.public.none(`create table users(name text);
                insert into users values ('Georges');`);
    // create a restore point & mess with data
    const backup = db.backup();
    db.public.none(`update users set name='John';`);
    // restore it !
    backup.restore();
    db.public.many(`select * from users`);


})
