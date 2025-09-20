<?php

namespace App;

enum FlashMessageTypeEnum: string
{
    case SUCCESS = 'success';
    case ERROR = 'error';
    case DANGER = 'danger';
}
