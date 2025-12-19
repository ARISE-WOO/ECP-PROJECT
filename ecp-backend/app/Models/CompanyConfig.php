<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CompanyConfig extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'sector',
        'location',
        'opening_hours',
        'target_audience',
        'tone',
        'networks',
        'telegram_token',
        'telegram_chat_id',
        'bot_started',
        'is_active'
    ];

    protected $casts = [
        'networks' => 'array',
        'bot_started' => 'boolean',
        'is_active' => 'boolean'
    ];

    // Réseaux en texte
    public function getNetworksTextAttribute(): string
    {
        return implode(', ', $this->networks ?? []);
    }

    // Vérifier un réseau
    public function hasNetwork(string $network): bool
    {
        return in_array($network, $this->networks ?? []);
    }
}
