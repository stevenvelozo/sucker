{
	Sucker:
	{
		"Sources":
		{
			// On CSV Files Header:True and Header:1 are synonymous.
//			"ACPC_CSV": { Type:"CSV_File", File:`${__dirname}/Alcohol_Consumption_Per_Country.csv`, Header:true }
			"RNG Test 1": { Type:"RandomNoise" }
		},

		"Writers":
		{
//			"LocalMeadowEndpoints": { "MeadowRootURI":"http://localhost:8080/1.0/", "AuthenticationUser":"Will", "AuthenticationPassword":"IAm" }
//			"LogFile": { "Type":"FableLog", "Message":"Entity Record Write" }
		},

		// These are the mappings from the SOURCES to the MARSHALLERS
		"Mappings":
		[
			// In absence of a marshaller mapping, the Source will use whatever Marshaller is built into itself.
//			{From:"ACPC_CSV", To:"ACPC_CSV" }
		]
	}
}