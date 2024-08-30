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
SELECT SUM(num_cupcakes)
FROM orders
WHERE processed = 'f';

-- Problem 4
SELECT c.name, SUM(o.num_cupcakes)
FROM cupcakes AS c
LEFT JOIN orders AS o
  ON c.id = o.cupcake_id
GROUP BY c.name
ORDER BY c.name;

