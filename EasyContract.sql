	create table utilisateur (
		utilisateur_id SERIAL PRIMARY KEY,  
		civilite VARCHAR (50) NOT NULL,
		nom VARCHAR (50) NOT NULL,
		prenom VARCHAR (100) NOT NULL,
		telephone VARCHAR (14) NOT NULL,
		rue VARCHAR (200) NOT NULL,
		cp VARCHAR (5) NOT NULL ,
		ville VARCHAR (100) NOT NULL,
		email VARCHAR (200) NOT NULL UNIQUE,
		mdp VARCHAR (200) NOT NULL ,
		role boolean
	);
	
	/*************************************
	 ******* Table contrat ***************
	 *************************************/
	 
  	create table contrat (
		contrat_id SERIAL PRIMARY KEY,
		fki_entreprise INTEGER,
		fki_salarie INTEGER,
		type_contrat VARCHAR (100) NOT NULL,
		is_fulltime BOOLEAN NOT NULL,
		date_debut DATE NOT NULL ,
		date_fin DATE,
		periode_essai VARCHAR (200) NOT NULL,
		motif VARCHAR (200),
		fonction VARCHAR (200) NOT NULL,
		satut VARCHAR (200)
	);
	
	/*************************************
	 ******* Table salarie ***************
	 *************************************/
 		
	create table salarie (
		salarie_id SERIAL PRIMARY KEY,  
		nom_jeune_fille VARCHAR (200),
		num_ss NUMERIC (13) NOT NULL,
		date_naissance date NOT NULL,
		lieu_naissance VARCHAR (249) NOT NULL,
		pays_naissance VARCHAR (100) NOT NULL
	) INHERITS (utilisateur);
	
	/*************************************
	 ******* Table entrepris *************
	 *************************************/
	 create table entreprise (
		entreprise_id SERIAL PRIMARY KEY,  
		siret NUMERIC NOT NULL,
		raison_sociale VARCHAR (200) NOT NULL,
		code_ape NUMERIC NOT NULL
	) INHERITS (utilisateur);
	
	/************************************
	********* FOREIGN KEY ***************
	************************************/
	ALTER TABLE contrat
	ADD CONSTRAINT fki_salarie 
	FOREIGN KEY (fki_salarie) 
	REFERENCES salarie (salarie_id);
	
	/************************************
	********* FOREIGN KEY ***************
	************************************/
	ALTER TABLE contrat
	ADD CONSTRAINT fki_entreprise
	FOREIGN KEY (fki_entreprise)
	REFERENCES entreprise (entreprise_id);
	
	/************************************************************************************************************/
	