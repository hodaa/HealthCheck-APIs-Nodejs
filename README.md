## Hotels 
This is  an API that compare and sort a massive amount of data from different 
sources and returns a JSON response that contains a list of
hotel rooms (cheapest to most expensive).

## Installation

* `docker-compose up -d`

From PHP image
* `docker-compose exec php bash`
    * `composer install`
    * `php artisan key:generate`



## Usage

Hit this url using Get Method

`http://localhost:8081/api/v1/hotels`




<br />

## Architecture

* If you want  to add a new Data provider you can go to
  `app/DataProvider/` and add new class extends HotelDataMapper class  and map name from your provider to system names.
  

  

## Design Pattern Used

1- `Abstract Factory` pattern to encapsulate creation of the data provider object  from the business logic

2- `Reposiotory` pattern  to get data form datasource (Apis).

3- `Service` pattern I added all business logic in separate classes.



<br>


## Testing
From Nodejs image
* `npm test`

Run

    vendor/phpunit/bin


## Tools
* PHP7.4
* Laravel
* Docker
* phpunit


# standard --fix






    
