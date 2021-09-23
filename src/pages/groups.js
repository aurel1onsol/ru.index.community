import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from '@mui/material'
import RuFediLogo from '../svg/ru-fedi'
import React from 'react'
import { graphql } from 'gatsby'
import { styled } from '@mui/styles'
import Masonry from '@mui/lab/Masonry'
import MasonryItem from '@mui/lab/MasonryItem'
import Link from '../components/Link'
import GroupCard from '../components/GroupCard'

const LogoWrapper = styled('div')({
  height: 48
})

const Grow = styled('div')({
  flexGrow: 1
})

export default function Communities ({ data }) {
  const instances = data.allGroupsJson.nodes
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar
        position='static' style={{
          background: 'transparent',
          width: '100%',
          maxWidth: 1440,
          margin: 'auto'
        }} elevation={0}
      >
        <Toolbar>
          <Link to='/'>
            <LogoWrapper>
              <RuFediLogo />
            </LogoWrapper>
          </Link>
          <Grow />
          <Link to='/communities' color='inherit' underline='none'>
            <Button color='inherit'>Сервера</Button>
          </Link>
          <Link to='/groups' color='inherit' underline='none'>
            <Button color='inherit'>Группы</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth='xl'>
        <Grid container spacing={3} justify='space-around'>
          <Grid item container xs={12} spacing={3} justify='left'>
            <Grid item xs={12} sm={12} md={10}>
              <Typography variant='h2'>Группы</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} justify='left'>
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2} sx={{overflow: 'inherit'}}>
              {instances.map((i) => <MasonryItem key={i.id}><Box><GroupCard instance={i} /></Box></MasonryItem>)}
            </Masonry>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export const query = graphql`
query {
    allGroupsJson(sort: {fields: handle}) {
        nodes {
            uri
            title
            short_description
            thumbnail
            icon
            handle
            members
        }
    }
  }
`
