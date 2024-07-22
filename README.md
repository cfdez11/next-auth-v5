## Description
Auth v5 implemented with NextJS, Prisma, Postgre SQL

## Setup
1. Clone repo
2. Create ```.env``` from ```.env.template``` and fill the variables
3. Install dependencies ```npm i```
4. Generate prisma client ```nnpx prisma generate``` 
5. Clean cookies
6. Start ```npm run dev```

## Changes models prisma
```
npx prisma generate
```
```
npx prisma db push
```

## Clean database
```
npx prisma migrate reset
```

## Open prisma studio
```
npx prisma studio
```