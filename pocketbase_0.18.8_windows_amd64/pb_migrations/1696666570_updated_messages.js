/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kfy1n66126waidk")

  collection.viewRule = null
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kfy1n66126waidk")

  collection.viewRule = ""
  collection.createRule = null

  return dao.saveCollection(collection)
})
