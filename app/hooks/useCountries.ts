import countries from "world-countries";

const formattedCountries = countries.map((country) => (
    {
        value: country?.cca2,
    }
))