<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('company_configs', function (Blueprint $table) {
            $table->id();

            // Infos entreprise
            $table->string('company_name');
            $table->string('sector');
            $table->string('location')->nullable();
            $table->string('opening_hours')->nullable();
            $table->text('target_audience')->nullable();

            // Communication
            $table->enum('tone', [
                'Professionnel',
                'Décontracté',
                'Créatif',
                'Informatif'
            ])->default('Professionnel');

            $table->json('networks');

            //  Telegram (clé du système)
            $table->uuid('telegram_token')->unique()->nullable();
            $table->string('telegram_chat_id')->unique()->nullable();

            // État
            $table->boolean('bot_started')->default(false);
            $table->boolean('is_active')->default(true);

            $table->timestamps();

            // Index utiles
            $table->index('company_name');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('company_configs');
    }
};