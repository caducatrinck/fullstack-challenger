#!/bin/bash
php artisan migrate
exec apache2-foreground