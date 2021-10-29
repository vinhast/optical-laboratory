const fields =
[`parent_id`, `user_id`, `name`, `description`, `type`, `ncm`, `cst`, `cfop`, `unit_type_id`, `price`, `spherical_start`, `spherical_end`, `cylindrical_start`, `cylindrical_end`]

const migration = fields.map(
  item =>
  ({
    name: `${item}`,
    type: `int`,
    isNullable: true,
  }),
);

const entity = fields.map(
  item => `
  @Column()
  ${item}?: string;  `
);

console.log(migration);

console.log(entity);


//run: node fieldtotypeorm.js