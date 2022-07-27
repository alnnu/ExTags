CREATE TABLE pessoa (
    email text PRIMARY KEY,
    password text,
    username text
);


CREATE TABLE Projeto (
    nome text,
    id SERIAL PRIMARY KEY,
    dia DECIMAL,
    mes DECIMAL,
    ano DECIMAL,
    estado DECIMAL,
    gerente_email text
);

ALTER TABLE Projeto ADD CONSTRAINT FK_Projeto_2
    FOREIGN KEY (gerente_email)
    REFERENCES pessoa (email)
    ON DELETE CASCADE;


CREATE TABLE participa (
    pessoa_email text,
    Projeto_id int,
	CONSTRAINT pk_par primary key(pessoa_email,Projeto_id)
);

ALTER TABLE participa ADD CONSTRAINT FK_participa_1
    FOREIGN KEY (pessoa_email)
    REFERENCES pessoa (email)
    ON DELETE CASCADE;

ALTER TABLE participa ADD CONSTRAINT FK_participa_2
    FOREIGN KEY (Projeto_id)
    REFERENCES Projeto (id)
    ON DELETE CASCADE;


CREATE TABLE nota (
    nome text,
    texto text,
    data DATE,
    id SERIAL PRIMARY KEY,
    Projeto_id int,
    pessoa_email text
);

ALTER TABLE nota ADD CONSTRAINT FK_nota_2
    FOREIGN KEY (Projeto_id)
    REFERENCES Projeto (id)
    ON DELETE CASCADE;

ALTER TABLE nota ADD CONSTRAINT FK_nota_3
    FOREIGN KEY (pessoa_email)
    REFERENCES pessoa (email)
    ON DELETE CASCADE;

CREATE TABLE Tarefa (
    dia DECIMAL,
    mes DECIMAL,
    ano DECIMAL,
    descricao text,
    prioridade DECIMAL,
    estado DECIMAL,
    estimativa DECIMAL,
    id SERIAL PRIMARY KEY,
    nome text,
    Projeto_id int,
    pessoa_email text
);

ALTER TABLE Tarefa ADD CONSTRAINT FK_Tarefa_2
    FOREIGN KEY (Projeto_id)
    REFERENCES Projeto (id)
    ON DELETE CASCADE;

ALTER TABLE Tarefa ADD CONSTRAINT FK_Tarefa_3
    FOREIGN KEY (pessoa_email)
    REFERENCES pessoa (email);


CREATE TABLE processo (
    log text,
    log_data text,
    id SERIAL PRIMARY KEY,
    pessoa_email text,
    Tarefa_id int
);

ALTER TABLE processo ADD CONSTRAINT FK_processo_2
    FOREIGN KEY (pessoa_email)
    REFERENCES pessoa (email)
    ON DELETE CASCADE;

ALTER TABLE processo ADD CONSTRAINT FK_processo_3
    FOREIGN KEY (Tarefa_id)
    REFERENCES Tarefa (id)
    ON DELETE CASCADE;


CREATE TABLE faz (
	id SERIAL PRIMARY KEY,
    Tarefa_id int,
    pessoa_email text
);

ALTER TABLE faz ADD CONSTRAINT FK_faz_1
    FOREIGN KEY (Tarefa_id)
    REFERENCES Tarefa (id)
    ON DELETE SET NULL;

ALTER TABLE faz ADD CONSTRAINT FK_faz_2
    FOREIGN KEY (pessoa_email)
    REFERENCES pessoa (email)
    ON DELETE SET NULL;
/*drop table faz, nota,participa,pessoa,processo,projeto,tarefa*/