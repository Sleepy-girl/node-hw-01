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
    const contactsData = await fs.readFile(this.contactsPath, {
      encoding: "utf-8",
    });
    return JSON.parse(contactsData);
  };

  getContactById = async (contactId) => {
    const contactsData = await this.listContacts();
    return contactsData.find((contact) => contact.id === contactId);
  };

  removeContact = async (contactId) => {
    const contactsData = await this.listContacts();
    const result = contactsData.filter((contact) => contact.id !== contactId);
    fs.writeFile(this.contactsPath, JSON.stringify(result));
    return this.listContacts();
  };

  addContact = async (name, email, phone) => {
    const contactsData = await this.listContacts();
    const newContact = {
      id: contactsData.length ? [...contactsData].pop().id + 10 : 1,
      name,
      email,
      phone,
    };
    contactsData.push(newContact);
    const contactsDataAsJSON = JSON.stringify(contactsData);
    fs.writeFile(this.contactsPath, contactsDataAsJSON);
    return newContact;
  };
}

module.exports = new Contacts();

//----------------------------------------------
// const contactsPath = path.resolve(__dirname, "data", "contacts.json");
// console.table(listContacts());

// function getContactById(contactId) {
//   return contactsPath.find((contact) => contact.id === contactId);
// }
// console.log(getContactById(9));

// function removeContact(contactId) {
//   return contactsPath.filter((contact) => contact.id !== contactId);
// }
// console.log(removeContact(10));

// function addContact(name, email, phone) {
//   const contact = {
//     id: contactsPath.length ? [...contactsPath].pop().id + 1 : 1,
//     name,
//     email,
//     phone,
//   };
//   return contactsPath.push(contact);
// }
// console.log(addContact("Anna", "pillow@gmail.com", "(050)545-0652"));

// module.exports = { listContacts };
