import fs from "node:fs/promises"
import { randomUUID } from "node:crypto"
import { formatDateToLocalDate } from "../../utils/formatDateToLocalDate.js"

const url = new URL('../db.json', import.meta.url)

class Database {
  #database = {}

  constructor() {
    fs.readFile(url, 'utf8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(url, JSON.stringify(this.#database))
  }

  create(table, data) {
    const { title, description } = data
    
    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: formatDateToLocalDate(new Date()),
      updated_at: formatDateToLocalDate(new Date())
    }

    if (this.#database[table]) {
      this.#database[table].push(task)
    } else {
      this.#database[table] = [task]
    }

    this.#persist()
  }

  list(table, query) {
    return this.#database[table] ?? []
  }

  update(table, id, data) {
    const findTaskIndex = this.#database[table].findIndex(task => task.id === id)

    this.#database[table][findTaskIndex] = {
      ...this.#database[table][findTaskIndex],
      title: data.title,
      description: data.description,
      updated_at: formatDateToLocalDate(new Date())
    }

    this.#persist()
  }

  delete(table, id) {
    const findTaskIndex = this.#database[table].findIndex(task => task.id === id)

    this.#database[table].splice(findTaskIndex, 1)

    this.#persist()
  }

  patch(table, id) {
    const findTaskIndex = this.#database[table].findIndex(task => task.id === id)

    this.#database[table][findTaskIndex] = {
      ...this.#database[table][findTaskIndex],
      completed_at: formatDateToLocalDate(new Date()),
    }

    this.#persist()
  }
}

const database = new Database()

export { database }