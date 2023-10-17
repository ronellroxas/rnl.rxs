/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kfy1n66126waidk")

  collection.name = "message"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kfy1n66126waidk")

  collection.name = "messages"

  return dao.saveCollection(collection)
})
