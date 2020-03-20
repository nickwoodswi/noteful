const ListsService = {
    getAllLists(knex) {
      return knex.select('*').from('lists_noteful')
    },
  
    insertList(knex, newList) {
      return knex
        .insert(newList)
        .into('lists_noteful')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('lists_noteful')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deleteList(knex, id) {
      return knex('lists_noteful')
        .where({ id })
        .delete()
    },
  
    updateList(knex, id, newListFields) {
      return knex('lists_noteful')
        .where({ id })
        .update(newListFields)
    },
  }
  
  module.exports = ListsService