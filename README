# **API Node.js con Express e MySQL**

Questa API consente la gestione di utenti, prodotti e ordini utilizzando un database MySQL. Il backend è costruito con `Express`, mentre la connessione al database è gestita con `MySQL2`. Sono inclusi strumenti per il testing come `Supertest` e `Sinon`.

---
## Endpoint Disponibili

### Utenti
- **Crea un utente** `POST /api/users`
- **Ottieni tutti gli utenti** `GET /api/users`
- **Ottieni un utente per ID** `GET /api/users/:id`
- **Aggiorna un utente** `PUT /api/users/:id`

### Prodotti
- **Crea un prodotto** `POST /api/products`
- **Ottieni tutti i prodotti** `GET /api/products`
- **Aggiorna un prodotto** `PUT /api/products/:id`

### Ordini
- **Crea un ordine** `POST /api/orders_item`
- **Ottieni tutti gli ordini** `GET /api/orders_item`
- **Ottieni ordini di un utente** `GET /api/orders_item/user/:user_id`

---
## Testing con Supertest e Sinon

Per eseguire i test:
```sh
npm test
```
L'API utilizza `mocha`, `chai`, `supertest` e `sinon` per testare le route e le funzioni del database.

---
## Tecnologie Utilizzate
- Node.js
- Express.js
- MySQL2
- dotenv
- Multer (per l'upload di immagini)
- Sinon (mocking nei test)
- Supertest (test API)
- Mocha & Chai (framework di test)

---
## Note
- Assicurati che MySQL sia in esecuzione prima di avviare il server.
- Il file `.env` deve essere incluso nel `.gitignore` per proteggere le credenziali sensibili.
- È consigliabile utilizzare **PM2** per la gestione del processo in produzione.

**Contributi e suggerimenti sono benvenuti!**

