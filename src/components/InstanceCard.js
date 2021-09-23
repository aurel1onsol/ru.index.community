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

export default function InstanceCard ({ instance }) {
  return (
    <Link href={'https://' + instance.node.uri} target='_blank' rel='noreferrer' underline='none'>
      <Card sx={{
        height: '100%'
      }}
      >
        <CardActionArea sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%'
        }}
        >
          <Container style={{
            display: 'flex',
            alignItems: 'center',
            padding: 16,
            width: '100%'
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
            ? <CardMedia style={{ height: 150, width: '100%' }}>
              <ImageLoader imgName={instance.node.thumbnail} />
            </CardMedia>
            : null}
          <CardContent style={{
            background: '#434B5E',
            flexGrow: 2,
            width: '100%'
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
            justifyContent: 'space-evenly',
            width: '100%'
          }}
          >
            <div style={{ display: 'flex' }}>
              <PeopleOutlined />
              <Typography style={{ paddingLeft: 4 }} variant='subtitle1' color='textSecondary' component='p'>
                {instance.node.users.total} {getPlural(instance.node.users.total, 'пользователь', 'пользователя', 'пользователей')}
              </Typography>
            </div>
            {false &&
              <div style={{ display: 'flex' }}>
                <EditOutlined />
                <Typography style={{ paddingLeft: 4 }} variant='subtitle1' color='textSecondary' component='p'>
                  {instance.node.posting.max_chars} {getPlural(instance.node.posting.max_chars, 'символ', 'символа', 'символов')}
                </Typography>
              </div>}
            {instance.node.administration?.provider &&
              <div style={{ display: 'flex' }}>
                <DnsOutlined />
                <Typography style={{ paddingLeft: 4 }} variant='subtitle1' color='textSecondary' component='p'>
                  {instance.node.administration.provider}
                </Typography>
              </div>}
            {instance.node.administration?.cloudflare &&
              <div style={{ display: 'flex' }}>
                <CloudflareLogo color='#d08770' size='2em' />
                <Typography style={{ paddingLeft: 4, color: '#d08770' }} variant='subtitle1' color='inherit' component='p'>
                  Использует Cloudflare
                </Typography>
              </div>}
          </Container>
        </CardActionArea>
      </Card>
    </Link>
  )
}
