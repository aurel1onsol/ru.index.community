import { DnsOutlined, EditOutlined, PeopleOutlined } from '@mui/icons-material'
import { Card, CardActionArea, CardContent, CardMedia, Container, Link, Typography } from '@mui/material'
import React from 'react'
import MastodonLogo from '../svg/mastodon'
import PleromaLogo from '../svg/pleroma'
import ImageLoader from './ImageLoader'
import MisskeyLogo from '../svg/misskey'
import FriendicaLogo from '../svg/friendica'
import HubzillaLogo from '../svg/hubzilla'
import CloudflareLogo from '../svg/cloudflare'
import { styled } from '@mui/styles'

const getPlural = (number, one, few, many) => {
  const plurals = new Intl.PluralRules('ru-RU')
  switch (plurals.select(number)) {
    case 'one':
      return one
    case 'few':
      return few
    case 'many':
      return many
    default:
      return many
  }
}

const Stat = styled('div')({
  display: 'flex'
})

export default function InstanceCard ({ instance }) {
  return (
    <Link href={'https://' + instance.node.uri} target='_blank' rel='noreferrer' underline='none'>
      <Card sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
      >
        <CardActionArea>
          <Container style={{
            display: 'flex',
            alignItems: 'center',
            padding: 16
          }}
          >
            <div style={{ flex: '1 1 auto' }}>
              <Typography variant='overline' style={{ lineHeight: 1.66 }}>{instance.node.software.name}</Typography>
              <Typography variant='h6'>{instance.node.uri}</Typography>
            </div>
            {instance.node.software.name === 'mastodon'
              ? <MastodonLogo color='white' size='3em' />
              : instance.node.software.name === 'pleroma'
                ? <PleromaLogo color='white' size='3em' />
                : instance.node.software.name === 'misskey'
                  ? <MisskeyLogo color='white' size='3em' />
                  : instance.node.software.name === 'friendica'
                    ? <FriendicaLogo color='white' size='3em' />
                    : instance.node.software.name === 'hubzilla'
                      ? <HubzillaLogo color='white' size='3em' /> : null}
          </Container>
          {instance.node.thumbnail
            ? <CardMedia style={{ height: 150 }}>
              <ImageLoader imgName={instance.node.thumbnail} />
            </CardMedia>
            : null}
          <CardContent style={{
            background: '#434B5E',
            flexGrow: 2
          }}
          >
            <Typography variant='body2' color='textSecondary' component='p'>
              {instance.node.short_description || ''}
            </Typography>
          </CardContent>
          <Container style={{
            padding: 16,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly'
          }}
          >
            <Stat>
              <PeopleOutlined />
              <Typography style={{ paddingLeft: 4 }} variant='subtitle1' color='textSecondary' component='p'>
                {instance.node.users.total} {getPlural(instance.node.users.total, 'пользователь', 'пользователя', 'пользователей')}
              </Typography>
            </Stat>
            {false &&
              <Stat>
                <EditOutlined />
                <Typography style={{ paddingLeft: 4 }} variant='subtitle1' color='textSecondary' component='p'>
                  {instance.node.posting.max_chars} {getPlural(instance.node.posting.max_chars, 'символ', 'символа', 'символов')}
                </Typography>
              </Stat>}
            {instance.node.administration?.provider &&
              <Stat>
                <DnsOutlined />
                <Typography style={{ paddingLeft: 4 }} variant='subtitle1' color='textSecondary' component='p'>
                  {instance.node.administration.provider}
                </Typography>
              </Stat>}
            {instance.node.administration?.cloudflare &&
              <Stat>
                <CloudflareLogo color='#d08770' size='2em' />
                <Typography style={{ paddingLeft: 4, color: '#d08770' }} variant='subtitle1' color='inherit' component='p'>
                  Использует Cloudflare
                </Typography>
              </Stat>}
          </Container>
        </CardActionArea>
      </Card>
    </Link>
  )
}
