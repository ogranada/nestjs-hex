A bounded context is a well defined scope that provide meaning to the entities.

E.G.

If you have the entity:
  - User

And you have two use cases:
  - Activities Management
  - Billing

The entity User could be used by both use cases:
  - An activity manager notify to a User.
  - A billing process use a User Billing information.

The entities User (Activity Management) and User (Billing) contains different information
(User email and User credit card info respectivelly), that could cause confussion to
Bussiness People (and Developers).

Use Bounded context delimitate the scope and give proper information to interested parts.

A bounded context could be considered as module in this case.
A module depends on infrastructure elements.
