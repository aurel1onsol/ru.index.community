import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from '@mui/material'
import RuFediLogo from '../svg/ru-fedi'
import React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import InstanceCard from '../components/InstanceCard'
import { graphql } from 'gatsby'
import FriendicaLogo from '../svg/friendica'
import MastodonLogo from '../svg/mastodon'
import MisskeyLogo from '../svg/misskey'
import PleromaLogo from '../svg/pleroma'
import HubzillaLogo from '../svg/hubzilla'
import { styled } from '@mui/styles'
import Masonry from '@mui/lab/Masonry'
import MasonryItem from '@mui/lab/MasonryItem'
import Link from '../components/Link'

const LogoWrapper = styled('div')({
  height: 48
})

const Grow = styled('div')({
  flexGrow: 1
})

export default function Communities ({ data }) {
  const [filter, setFilter] = React.useState(() => [])
  const instances = data.allInstancesJson.edges

  const handleFilter = (event, newFormats) => {
    setFilter(newFormats)
  }
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
          <Link to='/communities' color='inherit'>
            <Button color='inherit'>Сервера</Button>
          </Link>
          <Link to='/groups' color='inherit'>
            <Button color='inherit'>Группы</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth='xl'>
        <Grid container spacing={3} justify='space-around'>
          <Grid item container xs={12} spacing={3} justify='left'>
            <Grid item xs={12} sm={12} md={10}>
              <Typography variant='h2'>Сервера</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <Typography variant='body1'>Перед тем как регистрироваться, просматривай локальную ленту сервера, описание сервера, и список его самых активных пользователей. Так ты быстро поймёшь, какие люди на этом сервере обитают, и будет ли тебе там комфортно.</Typography>
            </Grid>

            <Grid item xs={12} justify='left'>
              <ToggleButtonGroup
                aria-label='text alignment'
                value={filter}
                onChange={handleFilter}
              >
                <ToggleButton value='mastodon' aria-label='left aligned'>
                  <MastodonLogo size='2em' color='#fff' />
                </ToggleButton>
                <ToggleButton value='pleroma' aria-label='centered'>
                  <PleromaLogo size='2em' color='#fff' />
                </ToggleButton>
                <ToggleButton value='misskey' aria-label='centered'>
                  <MisskeyLogo size='2em' color='#fff' />
                </ToggleButton>
                <ToggleButton value='friendica' aria-label='centered'>
                  <FriendicaLogo size='2em' color='#fff' />
                </ToggleButton>
                <ToggleButton value='hubzilla' aria-label='right aligned'>
                  <HubzillaLogo size='2em' color='#fff' />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} justify='left'>
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
              {filter.length === 0 ? instances.map((i) => <MasonryItem key={i.node.id}><Box><InstanceCard instance={i} /></Box></MasonryItem>)
                : instances.map((i) => filter.includes(i.node.software.name) && <MasonryItem key={i.node.id}><Box><InstanceCard instance={i} /></Box></MasonryItem>)}
            </Masonry>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export const query = graphql`
query {
    allInstancesJson (sort:{fields:[uri]}) {
      edges {
        node {
          id
          uri
          title
          thumbnail
          software {
            name
            version
          }
          short_description
          posting {
            max_chars
          }
          users {
            total
          }
          administration {
            backups_policy
            contact_email
            bus_factor
            federation_policies
            server_location
            cloudflare
            provider
          }
        }
      }
    }
  }
`
