
exports.seed = function (knex) {
 
  return knex('devices').del()
    .then(function () {
     return knex('nodes')
        .select('id')
        .where({ name: 'garden' })
        .then((nodeData) => {
          console.log("TCL: exports.seed -> nodeData", nodeData[0])
          return knex('devices').insert([
            { name: 'colour', node_id: nodeData[0].id, description: "Light and colour sensor", type: "tcs34725 rgb sensor", },
          ])
        })
    });
};
