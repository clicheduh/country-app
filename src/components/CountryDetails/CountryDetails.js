import './countrydetails-styles.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CountryDetails = () => {
	let publicFolder = process.env.PUBLIC_URL;
	const { id } = useParams();

	const [country, setCountry] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const [borderCodes, setBorderCodes] = useState(null);
	const [borderCountries, setBorderCountries] = useState([]);

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/alpha?codes=' + id)
			.then((res) => {
				setBorderCountries([]);
				setCountry(res.data[0]);
				setIsLoading(false);

				setBorderCodes(res.data[0].borders);
			})
			.catch((err) => {
				setError(err.message);
				setIsLoading(false);
				console.log(err);
			});
	}, [id]);

	useEffect(() => {
		if (borderCodes) {
			borderCodes.map((code) =>
				axios
					.get('https://restcountries.eu/rest/v2/alpha/' + code)
					.then((res) => {
						setBorderCountries((prevArr) => [...prevArr, res.data]);
					})
			);
		}
	}, [borderCodes]);

	return (
		<div className="CountryDetails">
			<div className="countrydetails-wrapper">
				<Link to="/">
					<button className="back-btn">
						<i class="fas fa-long-arrow-alt-left"></i>
						Back
					</button>
				</Link>
				{isLoading && <div>Country details loading...</div>}
				{country && (
					<div className="country-card">
						<div className="country-flag">
							<img src={country.flag} alt="" />
						</div>
						<div className="country-text">
							<h2 className="country-name">{country.name}</h2>
							<div>
								<div className="country-info">
									<p>
										<span>Native Name: </span>
										{country.nativeName}
									</p>
									<p>
										<span>Population: </span>
										{country.population}
									</p>
									<p>
										<span>Region: </span>
										{country.region}
									</p>
									<p>
										<span>Top Level Domain: </span>
										{country.topLevelDomain[0]}
									</p>
									<p>
										<span>Currencies: </span>
										{country.currencies[0].name}
									</p>
									<p>
										<span>Languages: </span>
										{country.languages.map((language) => (
											<p>{language.name}</p>
										))}
									</p>
									<p>
										<span>Sub region: </span>
										{country.subregion}
									</p>
									<p>
										<span>Capital: </span>
										{country.capital}
									</p>
								</div>
								<div className="border-countries">
									<div className="border-countries-heading">
										Border countries:
									</div>
									<div className="border-countries-names">
										{borderCountries ? (
											borderCountries.map((country) => (
												<Link
													to={`/details/${country.alpha3Code}`}
												>
													<div>{country.name}</div>
												</Link>
											))
										) : (
											<span>N/A</span>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CountryDetails;
