# Doming — Restaurant Service Product

Doming is an independent web product I conceived after observing a real restaurant-service problem: customers often had to stand up, search for a waiter or wait for attention whenever they wanted to place another order.

The product explored a digital layer connecting customers and restaurant operations through QR-code access, a digital menu, table state, orders and restaurant management.

## Product origin

The idea came while I was working with my father in a food business and paying attention to how customers interacted with service staff in restaurants and similar establishments.

Instead of starting from a technology, I started from the friction: **how could a customer request service or place another order with fewer steps?**

## Portfolio demo

The restored portfolio experience is available at:

`/demo/`

It provides a safe, fully navigable reconstruction of the main product flows using fictional browser-local data.

### Customer side

- QR-code/service entry concept
- table or pickup selection
- digital menu
- cart and quantity management
- simulated checkout

### Restaurant side

- operations dashboard
- table management
- order queue and status transitions
- menu management
- add/edit product flows

## Original architecture

- HTML
- CSS
- JavaScript
- Firebase Realtime Database
- Netlify
- Netlify Functions

The original code used realtime Firebase data for parts of the restaurant experience. The public portfolio demo intentionally uses `localStorage` so visitors cannot alter old production data or trigger real payment behavior.

## Historical implementation

The original 2024 pages remain in the repository and are linked from the demo. They were designed mobile-first for the Brazilian market and remain in Portuguese as historical evidence of the original product.

## Product learning

I built Doming before having formal professional experience in Product. Looking back, the strongest part of the project was discovering a real operational problem and independently turning it into a working product.

The main lesson I would apply today is to validate acquisition and willingness to pay earlier, before expanding the product and infrastructure.

## My role

End-to-end independent ownership across:

- problem identification
- product concept
- UX and customer journey
- frontend implementation
- realtime integration
- deployment
- iteration
