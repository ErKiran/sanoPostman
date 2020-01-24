
const message_types = [
    'text',
    'image',
    'video',
    'audio',
    'file',
    'cards',
    'list_item',
    'attachment'
  ];
  
  const keyboard_types = [
    'url',
    'flow',
    'call',
    'share',
    'node',
    'flow',
    'content',
    'buy',
    'dynamic_block_callback'
  ]

  const webview_sizes = [
      'native',
      'full',
      'tall',
      'compact'
  ]
  
  const supported_images = [
    'png',
    'jpg',
    'jpeg',
  ]
  
  const supported_media = [
    'mp3',
    'ogg',
    'mpeg',
    'mp4',
    'avi',
  ]
  
  const mime_types = [
    'audio/mp3' || 'audio/mpeg3',
    'audio/ogg',
    'audio/mpeg',
    'validation/mpeg',
    'video/mp4',
    'video/avi',
    'video/mpeg'
  ]

  
  module.exports ={
      message_types,
      keyboard_types,
      supported_images,
      supported_media,
      mime_types,
      webview_sizes
  }