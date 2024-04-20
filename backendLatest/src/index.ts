import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import {userRouter} from "./routes/user"
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET:string
  }
}>()
app.use('/*',cors())
app.route("api/v1/user",userRouter)
app.route("api/v1/blog",blogRouter)
// new PrismaClient().$extends(withAccelerate())
// app.post('/api/v1/user/signup', async (c) => {
//   const body = await c.req.json()
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env?.DATABASE_URL,
//   }).$extends(withAccelerate())
//   try{
//     //  await prisma.$transaction([prisma.user.create({
//     //   data:{
//     //       email:body.email,
//     //       password:body.password,
//     //       name:body.name
//     //   }
//     // })])
//     const user=await prisma.user.create({
//       data:{
//           email:body.email,
//           password:body.password,
//           name:body.name
//       }
//     })
//     const jwt=await sign({
//       id:user.id
//     },c.env.JWT_SECRET)
//     return c.text(jwt)
//   }catch(e) {
//     console.log("e",e)
//   return c.text("Invalid");
//   }
// })
// app.post('/api/v1/user/signin',async (c) => {
//   const body = await c.req.json()
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env?.DATABASE_URL,
//   }).$extends(withAccelerate())
//   try{
//     //  await prisma.$transaction([prisma.user.create({
//     //   data:{
//     //       email:body.email,
//     //       password:body.password,
//     //       name:body.name
//     //   }
//     // })])
//     const user=await prisma.user.findFirst({
//       where:{
//           email:body.email,
//           password:body.password,
//       }
//     })
//     if(!user){
//       c.status(403)//unauthorized
//       return c.json({
//         message:"Incorrect creds"
//       });
//     }
//     const jwt=await sign({
//       id:user.id
//     },c.env.JWT_SECRET)
//     return c.text(jwt)
//   }catch(e) {
//     console.log("e",e)
//   return c.text("Invalid");
//   }
// })

export default app
//postgresql://kalpit.bhanawat99:syN8Ir1kzQWA@ep-super-shape-86209005.us-east-2.aws.neon.tech/medium?sslmode=require




//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZjA5NTRiZWUtM2ZjMi00ZmIzLWI0YzQtZTkxNjY5ZjhjYTA0IiwidGVuYW50X2lkIjoiMTJiYjI4OGYxYjYxY2MxY2JmN2NlMmJlZjc1OGUyMjM1ODY5MjZjMmE3NzI0ODUxYzZlMWNlNjU2MjViOWI2MSIsImludGVybmFsX3NlY3JldCI6IjE5YzI0NTk3LTg5MDUtNDZkNi1hMmMxLWZhNzEwNmY4NDcyYyJ9.DnTb_tmmXLMUpxf0IcCzlhd7ScBBr08MVOHEXHusVbI"