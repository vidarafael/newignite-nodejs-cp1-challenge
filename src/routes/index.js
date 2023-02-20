import { database } from "../database/repository/index.js"
import fs from 'fs'
import { createReadStream } from 'node:fs'
import { extractDataOfCSV } from "../utils/extractDataOfCSV.js"

const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const tasks = database.list('tasks')

      res.writeHead(200)
      res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: '/tasks/csv',
    handler: async (req, res) => {
      const csvContent = req.body
      const contentFile = extractDataOfCSV(csvContent)
      for (const { title, description } of contentFile) {
        if(title && description) {
          database.create('tasks', { title, description })
        }
      }

      res.end("")
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { title, description } = req.body

      const tasks = database.create('tasks', { title, description })

      res.writeHead(200)
      res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PUT',
    path: '/tasks/:id',
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      database.update('tasks', id, { title, description })
      res.writeHead(200)
      res.end()
    }
  },
  {
    method: 'DELETE',
    path: '/tasks/:id',
    handler: (req, res) => {
      const { id } = req.params

      database.delete('tasks', id)
      res.writeHead(200)
      res.end()
    }
  },
  {
    method: 'PATCH',
    path: '/tasks/:id/complete',
    handler: (req, res) => {
      const { id } = req.params

      database.patch('tasks', id)
      res.writeHead(200)
      res.end()
    }
  },
]

export { routes }