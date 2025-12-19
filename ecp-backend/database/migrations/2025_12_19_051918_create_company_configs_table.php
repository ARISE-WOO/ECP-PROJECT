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

            // Liaison avec l'utilisateur (Propriétaire de la config)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Infos entreprise
            $table->string('company_name', 100);
            $table->string('sector', 50);
            $table->string('location', 150)->nullable();
            $table->string('opening_hours', 100)->nullable();
            $table->text('target_audience')->nullable();

            // Communication
            $table->enum('tone', [
                'Professionnel', 
                'Décontracté', 
                'Créatif', 
                'Informatif'
            ])->default('Professionnel');

            // Stockage des réseaux sélectionnés (ex: ["linkedin", "facebook"])
            $table->json('networks')->nullable();

            // Telegram (L'ID Telegram est un entier très grand)
            $table->bigInteger('telegram_chat_id')->unique()->nullable();
            // Token unique pour lier le site au bot (Magic Link)
            $table->uuid('setup_token')->unique()->nullable();

            // État du système
            $table->boolean('bot_started')->default(false);
            $table->boolean('oauth_completed')->default(false); // Nouveau : vérifie si l'OAuth est fini
            $table->boolean('is_active')->default(true);

            $table->timestamps();

            // Index pour la performance
            $table->index(['user_id', 'is_active']);
            $table->index('telegram_chat_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('company_configs');
    }
};
