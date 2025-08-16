-- Extensão e tipos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE campaign_status AS ENUM ('pending', 'active', 'paused', 'finished', 'canceled');
CREATE TYPE payment_status  AS ENUM ('pending', 'authorized', 'paid', 'failed', 'refunded', 'canceled');
CREATE TYPE payment_method  AS ENUM ('pix', 'boleto');

-- Tabelas base
CREATE TABLE user_account (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

CREATE TABLE admin (
  user_id UUID PRIMARY KEY,
  root    BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE donor (
  user_id     UUID PRIMARY KEY,
  tax_id      CHAR(11) NOT NULL UNIQUE,       
  full_name   TEXT NOT NULL,
  birth_date  DATE,
  gender      TEXT,
  phone       TEXT
);

CREATE TABLE address (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  state       CHAR(2) NOT NULL,
  city        TEXT    NOT NULL,
  neighborhood TEXT,
  street      TEXT    NOT NULL,
  number      INTEGER,
  complement  TEXT
);

CREATE TABLE donor_address (
  donor_id    UUID NOT NULL,
  address_id  UUID NOT NULL,
  is_primary  BOOLEAN NOT NULL DEFAULT FALSE,
  addr_type   TEXT,
  PRIMARY KEY (donor_id, address_id)
);

CREATE TABLE campaign (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  description      TEXT NOT NULL,
  target_amount    NUMERIC(12,2) NOT NULL CHECK (target_amount >= 0),
  start_date       DATE,
  end_date         DATE,
  image_url        TEXT,
  status           campaign_status NOT NULL DEFAULT 'pending',
  admin_id         UUID NOT NULL,
  requester_id     UUID
);

CREATE TABLE donation (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donation_type   TEXT NOT NULL,
  amount          NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  periodicity     TEXT,
  impact_area     TEXT,
  donor_id        UUID NOT NULL,
  campaign_id     UUID,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE payment (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  method           payment_method NOT NULL,
  status           payment_status NOT NULL DEFAULT 'pending',
  amount           NUMERIC(12,2),
  paid_at          TIMESTAMPTZ,
  donation_id      UUID NOT NULL
);

CREATE TABLE event_item (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url              TEXT,
  created_at       DATE,
  start_date       DATE,
  end_date         DATE,
  description      TEXT,
  admin_id         UUID NOT NULL
);

-- Constraints de Foreign Key
ALTER TABLE admin
  ADD CONSTRAINT fk_admin_user
    FOREIGN KEY (user_id) REFERENCES user_account(id) ON DELETE CASCADE;

ALTER TABLE donor
  ADD CONSTRAINT fk_donor_user
    FOREIGN KEY (user_id) REFERENCES user_account(id) ON DELETE CASCADE;

ALTER TABLE donor_address
  ADD CONSTRAINT fk_donor_address_donor
    FOREIGN KEY (donor_id) REFERENCES donor(user_id) ON DELETE CASCADE;

ALTER TABLE donor_address
  ADD CONSTRAINT fk_donor_address_address
    FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE RESTRICT;

ALTER TABLE campaign
  ADD CONSTRAINT fk_campaign_admin
    FOREIGN KEY (admin_id) REFERENCES admin(user_id) ON DELETE RESTRICT;

ALTER TABLE campaign
  ADD CONSTRAINT fk_campaign_requester
    FOREIGN KEY (requester_id) REFERENCES donor(user_id) ON DELETE SET NULL;

ALTER TABLE donation
  ADD CONSTRAINT fk_donation_donor
    FOREIGN KEY (donor_id) REFERENCES donor(user_id) ON DELETE CASCADE;

ALTER TABLE donation
  ADD CONSTRAINT fk_donation_campaign
    FOREIGN KEY (campaign_id) REFERENCES campaign(id) ON DELETE SET NULL;

ALTER TABLE payment
  ADD CONSTRAINT fk_payment_donation
    FOREIGN KEY (donation_id) REFERENCES donation(id) ON DELETE CASCADE;

ALTER TABLE event_item
  ADD CONSTRAINT fk_event_admin
    FOREIGN KEY (admin_id) REFERENCES admin(user_id) ON DELETE RESTRICT;

-- Índices
CREATE INDEX idx_donor_address_address_id ON donor_address(address_id);
CREATE INDEX idx_campaign_admin_id        ON campaign(admin_id);
CREATE INDEX idx_donation_donor_id        ON donation(donor_id);
CREATE INDEX idx_donation_campaign_id     ON donation(campaign_id);
CREATE INDEX idx_payment_donation_id      ON payment(donation_id);


-- Inserts de dados
INSERT INTO user_account (id, email, password_hash) VALUES
  ('11111111-1111-1111-1111-111111111111', 'admin@teste.com', 'hash_admin'),
  ('22222222-2222-2222-2222-222222222222', 'joao@teste.com', 'hash_joao'),
  ('33333333-3333-3333-3333-333333333333', 'maria@teste.com', 'hash_maria');

INSERT INTO admin (user_id, root) VALUES
  ('11111111-1111-1111-1111-111111111111', TRUE);

INSERT INTO donor (user_id, tax_id, full_name, birth_date, gender, phone) VALUES
  ('22222222-2222-2222-2222-222222222222', '12345678901', 'João da Silva', '1990-05-12', 'M', '(51)99999-0001'),
  ('33333333-3333-3333-3333-333333333333', '98765432100', 'Maria Oliveira', '1985-09-20', 'F', '(51)98888-0002');

INSERT INTO address (id, state, city, neighborhood, street, number, complement) VALUES
  ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'RS', 'Porto Alegre', 'Centro', 'Rua A', 100, 'Apto 101'),
  ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'RS', 'Canoas', 'Niterói', 'Av B', 200, NULL);

INSERT INTO donor_address (donor_id, address_id, is_primary, addr_type) VALUES
  ('22222222-2222-2222-2222-222222222222', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', TRUE, 'Residencial'),
  ('33333333-3333-3333-3333-333333333333', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', TRUE, 'Comercial');

INSERT INTO campaign (id, description, target_amount, start_date, end_date, image_url, status, admin_id, requester_id) VALUES
  ('bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'Campanha de Inverno', 5000.00, '2025-06-01', '2025-08-31', 'http://img.com/inverno.jpg', 'active', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222'),
  ('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbb2', 'Natal Solidário', 8000.00, '2025-11-01', '2025-12-25', 'http://img.com/natal.jpg', 'pending', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333');

INSERT INTO donation (id, donation_type, amount, periodicity, impact_area, donor_id, campaign_id) VALUES
  ('ccccccc1-cccc-cccc-cccc-ccccccccccc1', 'Financeira', 200.00, 'Única', 'Educação', '22222222-2222-2222-2222-222222222222', 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1'),
  ('ccccccc2-cccc-cccc-cccc-ccccccccccc2', 'Financeira', 150.00, 'Mensal', 'Alimentação', '33333333-3333-3333-3333-333333333333', 'bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbb2');

INSERT INTO payment (id, method, status, amount, paid_at, donation_id) VALUES
  ('ddddddd1-dddd-dddd-dddd-ddddddddddd1', 'pix', 'paid', 200.00, NOW(), 'ccccccc1-cccc-cccc-cccc-ccccccccccc1'),
  ('ddddddd2-dddd-dddd-dddd-ddddddddddd2', 'boleto', 'pending', 150.00, NULL, 'ccccccc2-cccc-cccc-cccc-ccccccccccc2');

INSERT INTO event_item (id, url, created_at, start_date, end_date, description, admin_id) VALUES
  ('eeeeeee1-eeee-eeee-eeee-eeeeeeeeeee1', 'http://eventos.com/inverno', '2025-05-15', '2025-06-01', '2025-08-31', 'Ação social de inverno', '11111111-1111-1111-1111-111111111111');
