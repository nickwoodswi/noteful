const NotesService = {
    getAllNotes(knex) {
      return knex.select('*').from('notes_noteful')
    },
  
    insertUser(knex, newNote) {
      return knex
        .insert(newNote)
        .into('notes_noteful')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('notes_noteful')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deleteUser(knex, id) {
      return knex('notes_noteful')
        .where({ id })
        .delete()
    },
  
    updateUser(knex, id, newNoteFields) {
      return knex('notes_noteful')
        .where({ id })
        .update(newUserFields)
    },
  }
  
  module.exports = NotesService