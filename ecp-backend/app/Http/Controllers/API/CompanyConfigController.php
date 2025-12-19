<?php
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\CompanyConfig;

public function store(Request $request) 
{
    $company = CompanyConfig::create([
        'company_name' => $request->company_name,
        'sector' => $request->sector,
        'location' => $request->location,
        'opening_hours' => $request->opening_hours,
        'target_audience' => $request->target_audience,
        'tone' => $request->tone,
        'networks' => $request->networks,
        'telegram_token' => Str::uuid(),
        'bot_started' => false,
        'is_active' => true
    ]);

    return response()->json([
        'success' => true,
        'telegram_link' => 'https://t.me/TON_BOT?start=' . $company->telegram_token
    ]);
}
