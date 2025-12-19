<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Telegram\Bot\Laravel\Facades\Telegram;
use App\Models\CompanyConfig;

class SendTelegramMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'telegram:send-message';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envoie un message Telegram aux entreprises actives';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $companies = CompanyConfig::where('is_active', true)
            ->where('bot_started', false)
            ->get();

        foreach ($companies as $company) {
            if ($company->telegram_chat_id) {
                Telegram::sendMessage([
                    'chat_id' => $company->telegram_chat_id,
                    'text' => "Bonjour {$company->company_name} ! Votre bot ECP est prêt."
                ]);

                $company->bot_started = true;
                $company->save();

                $this->info("Message envoyé à {$company->company_name}");
            }
        }

        return Command::SUCCESS;
    }
}
