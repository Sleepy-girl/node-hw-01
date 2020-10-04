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
    const contactsData = await fs.readFile(
      this.contactsPath,
      {
        encoding: "utf-8",
      },
      (err, data) => {
        if (err) throw err;
        return data;
      }
    );
    return JSON.parse(contactsData);
  };

  getContactById = async (contactId) => {
    const contactsData = await this.listContacts();
    return contactsData.find((contact) => contact.id === contactId);
  };

  removeContact = async (contactId) => {
    const contactsData = await this.listContacts();
    const result = contactsData.filter((contact) => contact.id !== contactId);
    fs.writeFile(this.contactsPath, JSON.stringify(result), (err) => {
      if (err) throw err;
    });
    return this.listContacts();
  };

  addContact = async (name, email, phone) => {
    const contactsData = await this.listContacts();
    const newContact = {
      id: contactsData.length && uuidv4(),
      name,
      email,
      phone,
    };
    contactsData.push(newContact);
    const contactsDataAsJSON = JSON.stringify(contactsData);
    fs.writeFile(this.contactsPath, contactsDataAsJSON, (err) => {
      if (err) throw err;
    });
    return this.listContacts();
  };
}

module.exports = new Contacts();
