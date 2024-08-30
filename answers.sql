-- Problem 1
SELECT email FROM customers;

-- Problem 2
SELECT id
FROM orders
WHERE customer_id = (
  SELECT id
  FROM customers
  WHERE fname = 'Elizabeth'
    AND lname = 'Crocker'
);

-- Problem 3
