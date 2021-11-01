const fields = 
[
  [`id`, 'int', 'NOT NULL'],
  [`parent_id`, 'int', 'DEFAULT NULL'],
  [`model`, 'varchar(255)', 'DEFAULT NULL'],
  [`foreign_key`, 'int', 'DEFAULT NULL'],
  [`alias`, 'varchar(255)', 'DEFAULT NULL'],
  [`lft`, 'int', 'DEFAULT NULL'],
  [`rght`, 'int', 'DEFAULT NULL'],
]
const migration = fields.map(
  item =>
  item[2] === 'NOT NULL' ?
  ({
    name: `${item[0]}`,
    type: `${item[1]}`,
  }) : ({
    name: `${item[0]}`,
    type: `${item[1]}`,
    isNullable: true,
  }),
);

const entity = fields.map(
  item => `
  @Column()
  ${item[0]}${item[2] === 'NOT NULL' ? '': '?'}: ${item[1]};
  `
);

console.log(entity);
console.log(migration);


//run: node fieldtotypeorm.js

