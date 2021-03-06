'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

function ShippingPrice()
// function which calculate the shipping price for each delivery
{
  var shippingPrice;
  var priceVolume;
  var priceDistance;
  var volReduction=0;
  deliveries.forEach(function(delivery) {
        truckers.forEach(function(truck){
          // check for the truck that correspond to the delivery
          if(delivery.truckerId==truck.id){

            // price volume and distance
            priceVolume=delivery.volume*truck.pricePerVolume;
            priceDistance=delivery.distance*truck.pricePerKm;

            // 50% discount  
            if(delivery.volume>25){
              volReduction=50;
            } // 30% discount 
            else if (delivery.volume>10) {
              volReduction=30;
            } // 10% discount
            else if (delivery.volume>5) {
              volReduction=10;
            }

            if(volReduction!=0){
              priceVolume=priceVolume-((priceVolume*volReduction)/100);
            }

            shippingPrice=priceVolume+priceDistance;

            delivery.price=shippingPrice;
          }
        });
    });
  

}

function Commission()
// function that calculate the commission for each delivery
{
  var com;
  var percentCommission=0.3;
  var insurancePart;
  var treasuryPart;
  var convargoPart;

  deliveries.forEach(function(delivery){
    com=delivery.price*percentCommission;
    delivery.price=delivery.price*(1-percentCommission);

    insurancePart=com/2;
    delivery.commission.insurance=insurancePart;

    treasuryPart=delivery.distance/500;
    delivery.commission.treasury=treasuryPart;

    convargoPart=com-(insurancePart+treasuryPart);
    delivery.commission.convargo=convargoPart;
  });

}

function Deductible()
// function that calculate the commission for each delivery
{
  var deductibleCost;
  deliveries.forEach(function(delivery){
    if(delivery.deductibleReduction==true)
    {
      deductibleCost=delivery.volume;
      delivery.price+=deductibleCost;
      delivery.commission.convargo+=deductibleCost;
    }

  });
}

function DisplayArray(array)
{
  array.forEach(function(element){
    console.log(element);
  });

  //console.log(deliveries);

}

function PayActors()
{
  deliveries.forEach(function(delivery){
    var com=delivery.price-(delivery.commission.insurance+delivery.commission.treasury+delivery.commission.convargo);

    actors.forEach(function(actor){
      if(delivery.id==actor.deliveryId)
      {
        actor.payment.forEach(function(pmt){
          if(pmt.who=="shipper")
          {
            pmt.amount=delivery.price;
          }
          if(pmt.who=="trucker")
          {
            pmt.amount=com;
          }
          if(pmt.who=="insurance")
          {
            pmt.amount=delivery.commission.insurance;
          }
          if(pmt.who=="treasury")
          {
            pmt.amount=delivery.commission.treasury;
          }
          if(pmt.who=="convargo")
          {
            pmt.amount=delivery.commission.convargo;
          }
        });
      }
    });
  });
}

function TotalShippingFees()
{

ShippingPrice();
Commission();
Deductible();
}

TotalShippingFees();
PayActors();

DisplayArray(deliveries);
DisplayArray(actors);