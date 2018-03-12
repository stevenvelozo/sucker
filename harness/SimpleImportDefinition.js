{
	Sucker:
	{
		"Sources":
		[
			// On CSV Files Header:True and Header:1 are synonymous.
			"ACPC_CSV": { Type:"CSV_File", File:`${__dirname}/Alcohol_Consumption_Per_Country.csv`, Header:true }
		],

		"Marshallers":
		[
			"ACPC_CSV": { Hash:'ACPC_CSV', Type:'AlcoholConsumptionPerCountry_CSV', Writer:'LocalMeadowEndpoints' }
		],

		"Writers":
		{
			"LogFile": { "Type":"FableLog", "Message":"Entity Record Write" }
			"LocalMeadowEndpoints": { "MeadowRootURI":"http://localhost:8080/1.0/", "AuthenticationUser":"Will", "AuthenticationPassword":"IAm" }
		},

		// These are the mappings from the SOURCES to the MARSHALLERS
		"Mappings":
		[
			{From:"ACPC_CSV", To:"ACPC_CSV" }
		]
	}
}