const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");
// console.log(fs);
// console.log(path);

// const contactsPath = require("./db/contacts.json");
// console.log(contactsPath);

class Contacts {
  constructor() {
    this.contactsPath = path.resolve(__dirname, "db", "contacts.json");
  }

  listContacts = async () => {
    try {
      const contactsData = await fs.readFile(this.contactsPath, {
        encoding: "utf-8",
      });
      return JSON.parse(contactsData);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  getContactById = async (contactId) => {
    try {
      const contactsData = await this.listContacts();
      return contactsData.find((contact) => contact.id === contactId);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  removeContact = async (contactId) => {
    try {
      const contactsData = await this.listContacts();
      const result = contactsData.filter((contact) => contact.id !== contactId);
      await fs.writeFile(this.contactsPath, JSON.stringify(result));
      return this.listContacts();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  addContact = async (name, email, phone) => {
    try {
      const contactsData = await this.listContacts();
      const newContact = {
        id: contactsData.length && uuidv4(),
        name,
        email,
        phone,
      };
      contactsData.push(newContact);
      const contactsDataAsJSON = JSON.stringify(contactsData);
      await fs.writeFile(this.contactsPath, contactsDataAsJSON);
      return this.listContacts();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
}

module.exports = new Contacts();
