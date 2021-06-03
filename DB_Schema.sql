CREATE TABLE Coins ( 
	ID                   integer NOT NULL  PRIMARY KEY  ,
	Asset_ID             varchar(6) NOT NULL    ,
	CONSTRAINT Unq_Coins_Asset_ID UNIQUE ( Asset_ID ) 
 );

CREATE TABLE Currency ( 
	ID                   integer NOT NULL  PRIMARY KEY  ,
	CUR_ID               varchar(6) NOT NULL    
 );

CREATE TABLE Tbl ( 
	ID                   integer NOT NULL  PRIMARY KEY  ,
	Coin_ID              integer NOT NULL    ,
	Cur_ID               integer NOT NULL    ,
	time_period_start    datetime     ,
	time_period_end      datetime     ,
	time_open            datetime     ,
	time_close           datetime     ,
	rate_open            double     ,
	rate_high            double     ,
	rate_low             double     ,
	rate_close           double     ,
	FOREIGN KEY ( Coin_ID ) REFERENCES Coins( ID )  ,
	FOREIGN KEY ( Cur_ID ) REFERENCES Currency( ID )  
 );
